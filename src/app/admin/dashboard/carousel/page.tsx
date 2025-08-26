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
import { MoreHorizontal, PlusCircle, Loader2, Image as ImageIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { storage, firestore } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

interface CarouselItem {
  id: string;
  src: string;
  alt: string;
  status: "Published" | "Draft";
}

const newItemTemplate: Omit<CarouselItem, 'id'> = {
    src: "https://placehold.co/400x225.png",
    alt: "",
    status: "Published",
};

export default function CarouselAdmin() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('edit');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);
  const [editedItem, setEditedItem] = useState<Omit<CarouselItem, 'id'> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "carousel"));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CarouselItem));
        setCarouselItems(items);
      } catch (error) {
        console.error("Error fetching carousel items: ", error);
        toast({
          variant: "destructive",
          title: "Gagal Mengambil Data!",
          description: "Terjadi kesalahan saat mengambil data carousel dari database.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarouselItems();
  }, [toast]);


  const handleEditClick = (item: CarouselItem) => {
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

    setIsUploading(true);
    let imageUrl = editedItem.src;

    try {
        if (imageFile) {
             if (dialogMode === 'edit' && selectedItem) {
                const isFirebaseStorageUrl = selectedItem.src && selectedItem.src.includes('firebasestorage.googleapis.com');
                if (isFirebaseStorageUrl) {
                    try {
                        const oldImageRef = ref(storage, selectedItem.src);
                        await deleteObject(oldImageRef);
                    } catch (deleteError: any) {
                        if (deleteError.code !== 'storage/object-not-found') {
                           throw deleteError;
                        }
                        console.warn("Old image not found in Storage, skipping deletion:", selectedItem.src);
                    }
                }
            }

            const imageRef = ref(storage, `carousel-images/${uuidv4()}-${imageFile.name}`);
            const uploadTask = uploadBytesResumable(imageRef, imageFile);

            await new Promise<void>((resolve, reject) => {
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
                        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve();
                    }
                );
            });
        }
        
        const dataToSave = {
            ...editedItem,
            src: imageUrl,
        };

        if (dialogMode === 'edit' && selectedItem) {
            const itemDocRef = doc(firestore, "carousel", selectedItem.id);
            await updateDoc(itemDocRef, dataToSave);
            setCarouselItems(items => items.map(item => item.id === selectedItem.id ? { ...item, ...dataToSave } : item));
            toast({
                title: "Sukses!",
                description: "Item carousel berhasil diperbarui.",
            });
        } else if (dialogMode === 'add') {
            const docRef = await addDoc(collection(firestore, "carousel"), dataToSave);
            setCarouselItems(items => [...items, { id: docRef.id, ...dataToSave }]);
            toast({
                title: "Sukses!",
                description: "Item carousel baru berhasil ditambahkan.",
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

  const handleAltTextChange = (value: string) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, alt: value });
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
          setEditedItem({ ...editedItem, src: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Carousel</h2>
          <p className="text-muted-foreground">Kelola gambar carousel di halaman utama.</p>
        </div>
        <Button onClick={handleAddClick}>
          <PlusCircle className="mr-2 h-4 w-4" /> Tambah Gambar
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Gambar</TableHead>
              <TableHead>Alt Text</TableHead>
              <TableHead>Status</TableHead>
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
                     <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : carouselItems.length > 0 ? (
              carouselItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={120}
                      height={67.5}
                      className="rounded-md object-cover aspect-video"
                      unoptimized // Required for external URLs like Firebase Storage
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.alt}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Published' ? 'default' : 'secondary'}>
                        {item.status}
                    </Badge>
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
                        <DropdownMenuItem>Hapus</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                       <ImageIcon className="mx-auto text-muted-foreground h-12 w-12 mb-2" />
                       <h3 className="font-semibold">Data Carousel Kosong</h3>
                       <p className="text-muted-foreground text-sm">Anda belum memiliki item carousel. Silakan tambahkan.</p>
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'edit' ? 'Ubah Item Carousel' : 'Tambah Item Carousel'}</DialogTitle>
            <DialogDescription>
              {dialogMode === 'edit'
                ? 'Lakukan perubahan pada item carousel Anda di sini. Klik simpan jika sudah selesai.'
                : 'Unggah gambar baru dan masukkan alt text. Klik simpan untuk menambahkan.'}
            </DialogDescription>
          </DialogHeader>
          {editedItem && (
            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                <Label>Pratinjau Gambar</Label>
                <Image
                    src={editedItem.src}
                    alt={editedItem.alt || "Pratinjau"}
                    width={400}
                    height={225}
                    className="rounded-md object-cover aspect-video border"
                    unoptimized
                  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-upload">Unggah Gambar Baru</Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                {isUploading && <Progress value={uploadProgress} className="w-full mt-2" />}
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input id="alt" value={editedItem.alt} onChange={(e) => handleAltTextChange(e.target.value)} disabled={isUploading} />
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
    </div>
  )
}
