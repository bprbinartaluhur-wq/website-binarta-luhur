
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
import { MoreHorizontal, PlusCircle, Loader2, Users, Trash2, ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { storage, firestore } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

interface TeamMember {
  id: string;
  image: string;
  name: string;
  role: string;
  order: number;
}

const newItemTemplate: Omit<TeamMember, 'id'> = {
    image: "https://placehold.co/400x400.png",
    name: "",
    role: "",
    order: 0,
};

export default function TeamAdmin() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('edit');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedItem, setSelectedItem] = useState<TeamMember | null>(null);
  const [itemToDelete, setItemToDelete] = useState<TeamMember | null>(null);
  const [editedItem, setEditedItem] = useState<Omit<TeamMember, 'id' | 'order'> & { order: number | string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const q = query(collection(firestore, "team"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
        setTeamMembers(items);
      } catch (error) {
        console.error("Error fetching team members: ", error);
        toast({
          variant: "destructive",
          title: "Gagal Mengambil Data!",
          description: "Terjadi kesalahan saat mengambil data tim dari database.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeamMembers();
  }, [toast]);

  const handleEditClick = (item: TeamMember) => {
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
     if (!editedItem.name || !editedItem.role) {
        toast({
            variant: "destructive",
            title: "Data Tidak Lengkap!",
            description: "Nama dan jabatan harus diisi.",
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

            const imageRef = ref(storage, `team-images/${uuidv4()}-${imageFile.name}`);
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
            order: Number(editedItem.order) || 0,
        };

        if (dialogMode === 'edit' && selectedItem) {
            const itemDocRef = doc(firestore, "team", selectedItem.id);
            await updateDoc(itemDocRef, dataToSave);
            setTeamMembers(items => items.map(item => item.id === selectedItem.id ? { ...item, ...dataToSave, id: selectedItem.id } : item).sort((a,b) => a.order - b.order));
            toast({
                title: "Sukses!",
                description: "Anggota tim berhasil diperbarui.",
            });
        } else if (dialogMode === 'add') {
            const docRef = await addDoc(collection(firestore, "team"), dataToSave);
            setTeamMembers(items => [...items, { id: docRef.id, ...dataToSave }].sort((a,b) => a.order - b.order));
            toast({
                title: "Sukses!",
                description: "Anggota tim baru berhasil ditambahkan.",
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

  const handleFieldChange = (field: keyof Omit<TeamMember, 'id'>, value: string) => {
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

  const handleDeleteClick = (item: TeamMember) => {
    setItemToDelete(item);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    try {
        const itemDocRef = doc(firestore, "team", itemToDelete.id);
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

        setTeamMembers(items => items.filter(item => item.id !== itemToDelete.id));
        toast({
            title: "Berhasil Dihapus!",
            description: `Anggota tim "${itemToDelete.name}" telah dihapus.`,
        });
    } catch (error) {
        console.error("Error deleting item: ", error);
        toast({
            variant: "destructive",
            title: "Gagal Menghapus!",
            description: "Terjadi kesalahan saat menghapus anggota tim.",
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
          <h2 className="text-3xl font-bold tracking-tight">Tim Profesional</h2>
          <p className="text-muted-foreground">Kelola anggota tim Anda di sini.</p>
        </div>
        <Button onClick={handleAddClick}>
          <PlusCircle className="mr-2 h-4 w-4" /> Tambah Anggota
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Foto</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead className="w-[100px] text-center">
                 <div className="flex items-center justify-center gap-1">
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                    Urutan
                </div>
              </TableHead>
              <TableHead className="w-[80px]">
                <span className="sr-only">Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-16 h-16 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                     <Skeleton className="h-5 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-8 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : teamMembers.length > 0 ? (
              teamMembers.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover aspect-square"
                      unoptimized 
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell className="text-center font-medium">{item.order}</TableCell>
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
                    <TableCell colSpan={5} className="h-24 text-center">
                       <Users className="mx-auto text-muted-foreground h-12 w-12 mb-2" />
                       <h3 className="font-semibold">Data Tim Kosong</h3>
                       <p className="text-muted-foreground text-sm">Anda belum memiliki anggota tim. Silakan tambahkan.</p>
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'edit' ? 'Ubah Anggota Tim' : 'Tambah Anggota Tim'}</DialogTitle>
            <DialogDescription>
              {dialogMode === 'edit'
                ? 'Lakukan perubahan pada data anggota tim. Klik simpan jika sudah selesai.'
                : 'Unggah foto baru dan masukkan detail anggota tim. Klik simpan untuk menambahkan.'}
            </DialogDescription>
          </DialogHeader>
          {editedItem && (
            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                <Label>Pratinjau Foto</Label>
                <Image
                    src={editedItem.image}
                    alt={editedItem.name || "Pratinjau"}
                    width={128}
                    height={128}
                    className="rounded-full object-cover aspect-square border mx-auto"
                    unoptimized
                  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-upload">Unggah Foto Baru</Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                {isUploading && <Progress value={uploadProgress} className="w-full mt-2" />}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="name">Nama</Label>
                    <Input id="name" value={editedItem.name} onChange={(e) => handleFieldChange('name', e.target.value)} disabled={isUploading} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="order">Urutan</Label>
                    <Input id="order" type="number" value={editedItem.order} onChange={(e) => handleFieldChange('order', e.target.value)} disabled={isUploading} />
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="role">Jabatan</Label>
                <Input id="role" value={editedItem.role} onChange={(e) => handleFieldChange('role', e.target.value)} disabled={isUploading} />
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
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data anggota tim secara permanen
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
