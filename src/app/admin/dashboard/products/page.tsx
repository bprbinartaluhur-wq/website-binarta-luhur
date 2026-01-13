
'use client';

import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle, Loader2, Package, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { storage, firestore } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  category: "Tabungan" | "Deposito" | "Kredit";
  status: "Published" | "Draft";
}

const newItemTemplate: Omit<Product, 'id'> = {
    image: "https://placehold.co/600x400.png",
    name: "",
    description: "",
    category: "Tabungan",
    status: "Published",
};

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('edit');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Product | null>(null);
  const [editedItem, setEditedItem] = useState<Omit<Product, 'id'> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(firestore, "products"), orderBy("name"));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(items);
      } catch (error) {
        console.error("Error fetching products: ", error);
        toast({
          variant: "destructive",
          title: "Gagal Mengambil Data!",
          description: "Terjadi kesalahan saat mengambil data produk dari database.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [toast]);

  const handleEditClick = (item: Product) => {
    setDialogMode('edit');
    setSelectedItem(item);
    setEditedItem({ ...item });
    setImageFile(null);
    setUploadProgress(0);
    setIsDialogOpen(true);
  };
  
  const handleAddClick = () => {
    setDialogMode('add');
    setSelectedItem(null);
    setEditedItem(newItemTemplate);
    setImageFile(null);
    setUploadProgress(0);
    setIsDialogOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!editedItem) return;

    if (dialogMode === 'add' && !imageFile) {
        toast({
            variant: "destructive",
            title: "Gambar Diperlukan!",
            description: "Silakan pilih file gambar untuk diunggah.",
        });
        return;
    }
     if (!editedItem.name || !editedItem.description) {
        toast({
            variant: "destructive",
            title: "Data Tidak Lengkap!",
            description: "Nama dan deskripsi produk harus diisi.",
        });
        return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    let imageUrl = editedItem.image;

    try {
        if (imageFile) {
            if (dialogMode === 'edit' && selectedItem) {
                const isFirebaseStorageUrl = selectedItem.image && selectedItem.image.includes('firebasestorage.googleapis.com');
                if (isFirebaseStorageUrl) {
                    try {
                        const oldImageRef = ref(storage, selectedItem.image);
                        await deleteObject(oldImageRef);
                    } catch (deleteError: any) {
                        if (deleteError.code !== 'storage/object-not-found') {
                           throw deleteError;
                        }
                        console.warn("Old image not found in Storage, skipping deletion:", selectedItem.image);
                    }
                }
            }

            const imageRef = ref(storage, `product-images/${uuidv4()}-${imageFile.name}`);
            const uploadTask = uploadBytesResumable(imageRef, imageFile);

            imageUrl = await new Promise<string>((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    },
                    (error) => {
                        console.error("Upload error:", error);
                        reject(error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    }
                );
            });
        }
        
        const dataToSave = {
            ...editedItem,
            image: imageUrl,
        };

        if (dialogMode === 'edit' && selectedItem) {
            const itemDocRef = doc(firestore, "products", selectedItem.id);
            await updateDoc(itemDocRef, dataToSave);
            setProducts(items => items.map(item => item.id === selectedItem.id ? { ...item, ...dataToSave, id: selectedItem.id } : item));
            toast({
                title: "Sukses!",
                description: "Produk berhasil diperbarui.",
            });
        } else if (dialogMode === 'add') {
            const docRef = await addDoc(collection(firestore, "products"), dataToSave);
            setProducts(items => [...items, { id: docRef.id, ...dataToSave }]);
            toast({
                title: "Sukses!",
                description: "Produk baru berhasil ditambahkan.",
            });
        }

    } catch (error) {
        console.error("Error saving changes: ", error);
        toast({
            variant: "destructive",
            title: "Gagal!",
            description: "Terjadi kesalahan saat menyimpan perubahan.",
        });
    } finally {
        setIsUploading(false);
        setIsDialogOpen(false);
        setUploadProgress(0);
        setImageFile(null);
        setSelectedItem(null);
        setEditedItem(null);
    }
  };

  const handleFieldChange = (field: keyof Omit<Product, 'id'>, value: string) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [field]: value });
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editedItem) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result;
        if (typeof result === 'string') {
          setEditedItem({ ...editedItem, image: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = (item: Product) => {
    setItemToDelete(item);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    try {
        const itemDocRef = doc(firestore, "products", itemToDelete.id);
        await deleteDoc(itemDocRef);

        const isFirebaseStorageUrl = itemToDelete.image && itemToDelete.image.includes('firebasestorage.googleapis.com');
        if (isFirebaseStorageUrl) {
            try {
                const imageRef = ref(storage, itemToDelete.image);
                await deleteObject(imageRef);
            } catch (deleteError: any) {
                if (deleteError.code !== 'storage/object-not-found') {
                   throw deleteError;
                }
                console.warn("Image to delete not found in Storage:", itemToDelete.image);
            }
        }

        setProducts(items => items.filter(item => item.id !== itemToDelete.id));
        toast({
            title: "Berhasil Dihapus!",
            description: `Produk "${itemToDelete.name}" telah dihapus.`,
        });
    } catch (error) {
        console.error("Error deleting item: ", error);
        toast({
            variant: "destructive",
            title: "Gagal Menghapus!",
            description: "Terjadi kesalahan saat menghapus produk.",
        });
    } finally {
        setIsDeleting(false);
        setItemToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Produk</h2>
          <p className="text-muted-foreground">Kelola produk unggulan Anda di sini.</p>
        </div>
        <Button onClick={handleAddClick}>
          <PlusCircle className="mr-2 h-4 w-4" /> Tambah Produk
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Gambar</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Deskripsi Singkat</TableHead>
              <TableHead>
                <span className="sr-only">Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-[120px] h-[67.5px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-48" />
                  </TableCell>
                  <TableCell>
                     <Skeleton className="h-6 w-24 rounded-full" />
                  </TableCell>
                  <TableCell>
                     <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : products.length > 0 ? (
              products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={120}
                      height={67.5}
                      className="rounded-md object-cover aspect-video"
                      unoptimized
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Published' ? 'default' : 'secondary'}>
                        {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-sm truncate">
                    {item.description}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => handleEditClick(item)}>Ubah</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => handleDeleteClick(item)} className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
                <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                       <Package className="mx-auto text-muted-foreground h-12 w-12 mb-2" />
                       <h3 className="font-semibold">Data Produk Kosong</h3>
                       <p className="text-muted-foreground text-sm">Anda belum memiliki produk. Silakan tambahkan.</p>
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px] grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'edit' ? 'Ubah Produk' : 'Tambah Produk'}</DialogTitle>
            <DialogDescription>
              {dialogMode === 'edit'
                ? 'Lakukan perubahan pada produk Anda di sini. Klik simpan jika sudah selesai.'
                : 'Unggah gambar dan masukkan detail produk. Klik simpan untuk menambahkan.'}
            </DialogDescription>
          </DialogHeader>
          {editedItem && (
            <div className="grid gap-4 py-4 overflow-y-auto pr-6">
               <div className="space-y-2">
                <Label>Pratinjau Gambar</Label>
                <Image
                    src={editedItem.image}
                    alt={editedItem.name || "Pratinjau"}
                    width={400}
                    height={225}
                    className="rounded-md object-cover aspect-video border w-full"
                    unoptimized
                  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-upload">Unggah Gambar Baru</Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                {isUploading && <Progress value={uploadProgress} className="w-full mt-2" />}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nama Produk</Label>
                <Input id="name" value={editedItem.name} onChange={(e) => handleFieldChange('name', e.target.value)} disabled={isUploading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea id="description" value={editedItem.description} onChange={(e) => handleFieldChange('description', e.target.value)} disabled={isUploading} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select onValueChange={(value: "Tabungan" | "Deposito" | "Kredit") => handleFieldChange('category', value)} defaultValue={editedItem.category} disabled={isUploading}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tabungan">Tabungan</SelectItem>
                    <SelectItem value="Deposito">Deposito</SelectItem>
                    <SelectItem value="Kredit">Kredit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value: "Published" | "Draft") => handleFieldChange('status', value)} defaultValue={editedItem.status} disabled={isUploading}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isUploading}>Batal</Button>
            <Button onClick={handleSaveChanges} disabled={isUploading}>
              {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
       <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus produk secara permanen
              dari server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
    

    