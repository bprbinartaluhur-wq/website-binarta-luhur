
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
import { MoreHorizontal, PlusCircle, Loader2, Briefcase, Trash2 } from "lucide-react"
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
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { format } from 'date-fns';

interface Vacancy {
  id: string;
  title: string;
  location: string;
  type: "Penuh Waktu" | "Paruh Waktu" | "Magang";
  description: string;
  status: "Dibuka" | "Ditutup";
  flyer: string;
  createdAt: Timestamp;
}

type EditableVacancy = Omit<Vacancy, 'id' | 'createdAt'>;

const newItemTemplate: EditableVacancy = {
    title: "",
    location: "",
    type: "Penuh Waktu",
    description: "",
    status: "Dibuka",
    flyer: "https://placehold.co/600x800.png",
};

export default function VacanciesAdmin() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Vacancy | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Vacancy | null>(null);
  const [editedItem, setEditedItem] = useState<EditableVacancy | null>(null);
  const [flyerFile, setFlyerFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const q = query(collection(firestore, "vacancies"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vacancy));
        setVacancies(items);
      } catch (error) {
        console.error("Error fetching vacancies: ", error);
        toast({
          variant: "destructive",
          title: "Gagal Mengambil Data!",
          description: "Terjadi kesalahan saat mengambil data lowongan dari database.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchVacancies();
  }, [toast]);

  const handleEditClick = (item: Vacancy) => {
    setDialogMode('edit');
    setSelectedItem(item);
    setEditedItem({ ...item });
    setFlyerFile(null);
    setUploadProgress(0);
    setIsDialogOpen(true);
  };
  
  const handleAddClick = () => {
    setDialogMode('add');
    setSelectedItem(null);
    setEditedItem(newItemTemplate);
    setFlyerFile(null);
    setUploadProgress(0);
    setIsDialogOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!editedItem) return;

    if (!editedItem.title || !editedItem.location || !editedItem.description) {
        toast({
            variant: "destructive",
            title: "Data Tidak Lengkap!",
            description: "Judul, lokasi, dan deskripsi harus diisi.",
        });
        return;
    }
    
    if (dialogMode === 'add' && !flyerFile) {
        toast({
            variant: "destructive",
            title: "Gambar Flayer Diperlukan!",
            description: "Silakan pilih file gambar untuk diunggah.",
        });
        return;
    }

    setIsSaving(true);
    setUploadProgress(0);
    let flyerUrl = editedItem.flyer;

    try {
        if (flyerFile) {
            if (dialogMode === 'edit' && selectedItem?.flyer) {
                const isFirebaseStorageUrl = selectedItem.flyer.includes('firebasestorage.googleapis.com');
                if (isFirebaseStorageUrl) {
                    try {
                        const oldImageRef = ref(storage, selectedItem.flyer);
                        await deleteObject(oldImageRef);
                    } catch (deleteError: any) {
                        if (deleteError.code !== 'storage/object-not-found') {
                           throw deleteError;
                        }
                        console.warn("Old flyer not found in Storage, skipping deletion:", selectedItem.flyer);
                    }
                }
            }

            const flyerRef = ref(storage, `vacancy-flyers/${uuidv4()}-${flyerFile.name}`);
            const uploadTask = uploadBytesResumable(flyerRef, flyerFile);

            flyerUrl = await new Promise<string>((resolve, reject) => {
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
        
        const dataToSave: Omit<Vacancy, 'id' | 'createdAt'> & { createdAt?: any } = { 
            ...editedItem,
            flyer: flyerUrl,
        };

        if (dialogMode === 'edit' && selectedItem) {
            const itemDocRef = doc(firestore, "vacancies", selectedItem.id);
            await updateDoc(itemDocRef, dataToSave);
            setVacancies(items => items.map(item => item.id === selectedItem.id ? { ...item, ...dataToSave, id: selectedItem.id } as Vacancy : item));
            toast({
                title: "Sukses!",
                description: "Lowongan berhasil diperbarui.",
            });
        } else if (dialogMode === 'add') {
            dataToSave.createdAt = serverTimestamp();
            const docRef = await addDoc(collection(firestore, "vacancies"), dataToSave);
            const newVacancy = { ...dataToSave, id: docRef.id, createdAt: Timestamp.now() } as Vacancy;
            setVacancies(items => [newVacancy, ...items]);
            toast({
                title: "Sukses!",
                description: "Lowongan baru berhasil ditambahkan.",
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
        setIsSaving(false);
        setIsDialogOpen(false);
        setSelectedItem(null);
        setEditedItem(null);
        setFlyerFile(null);
        setUploadProgress(0);
    }
  };

  const handleFieldChange = (field: keyof EditableVacancy, value: string) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [field]: value });
    }
  };

  const handleFlyerUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editedItem) {
      setFlyerFile(file);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result;
        if (typeof result === 'string') {
          setEditedItem({ ...editedItem, flyer: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = (item: Vacancy) => {
    setItemToDelete(item);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    try {
        const itemDocRef = doc(firestore, "vacancies", itemToDelete.id);
        await deleteDoc(itemDocRef);

        if (itemToDelete.flyer && itemToDelete.flyer.includes('firebasestorage.googleapis.com')) {
            try {
                const flyerRef = ref(storage, itemToDelete.flyer);
                await deleteObject(flyerRef);
            } catch (deleteError: any) {
                if (deleteError.code !== 'storage/object-not-found') {
                   throw deleteError;
                }
                console.warn("Flyer to delete not found in Storage:", itemToDelete.flyer);
            }
        }

        setVacancies(items => items.filter(item => item.id !== itemToDelete.id));
        toast({
            title: "Berhasil Dihapus!",
            description: `Lowongan "${itemToDelete.title}" telah dihapus.`,
        });
    } catch (error) {
        console.error("Error deleting item: ", error);
        toast({
            variant: "destructive",
            title: "Gagal Menghapus!",
            description: "Terjadi kesalahan saat menghapus lowongan.",
        });
    } finally {
        setIsDeleting(false);
        setItemToDelete(null);
    }
  };

  const formatDate = (timestamp: Timestamp) => {
      if (!timestamp) return 'N/A';
      return format(timestamp.toDate(), 'dd MMMM yyyy');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lowongan Kerja</h2>
          <p className="text-muted-foreground">Kelola lowongan pekerjaan di sini.</p>
        </div>
        <Button onClick={handleAddClick}>
          <PlusCircle className="mr-2 h-4 w-4" /> Tambah Lowongan
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead>
                <span className="sr-only">Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-28 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><div className="h-8 w-8" /></TableCell>
                </TableRow>
              ))
            ) : vacancies.length > 0 ? (
              vacancies.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-sm truncate">{item.title}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell><Badge variant="outline">{item.type}</Badge></TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Dibuka' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
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
                       <Briefcase className="mx-auto text-muted-foreground h-12 w-12 mb-2" />
                       <h3 className="font-semibold">Tidak Ada Lowongan</h3>
                       <p className="text-muted-foreground text-sm">Saat ini tidak ada lowongan pekerjaan yang tersedia.</p>
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px] grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'edit' ? 'Ubah Lowongan' : 'Tambah Lowongan'}</DialogTitle>
            <DialogDescription>
              {dialogMode === 'edit'
                ? 'Lakukan perubahan pada detail lowongan pekerjaan.'
                : 'Masukkan detail untuk lowongan pekerjaan baru.'}
            </DialogDescription>
          </DialogHeader>
          {editedItem && (
            <div className="grid gap-4 py-4 overflow-y-auto pr-6">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Posisi</Label>
                <Input id="title" value={editedItem.title} onChange={(e) => handleFieldChange('title', e.target.value)} disabled={isSaving} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Input id="location" value={editedItem.location} onChange={(e) => handleFieldChange('location', e.target.value)} disabled={isSaving} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe</Label>
                  <Select onValueChange={(value: any) => handleFieldChange('type', value)} defaultValue={editedItem.type} disabled={isSaving}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Penuh Waktu">Penuh Waktu</SelectItem>
                      <SelectItem value="Paruh Waktu">Paruh Waktu</SelectItem>
                      <SelectItem value="Magang">Magang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value: any) => handleFieldChange('status', value)} defaultValue={editedItem.status} disabled={isSaving}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dibuka">Dibuka</SelectItem>
                      <SelectItem value="Ditutup">Ditutup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea id="description" value={editedItem.description} onChange={(e) => handleFieldChange('description', e.target.value)} disabled={isSaving} rows={5} />
              </div>
              <div className="space-y-2">
                <Label>Pratinjau Flayer</Label>
                <Image
                    src={editedItem.flyer}
                    alt="Pratinjau Flayer"
                    width={600}
                    height={800}
                    className="rounded-md object-contain aspect-[3/4] border w-full bg-muted/20"
                    unoptimized
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="flyer-upload">Unggah Flayer Baru</Label>
                <Input id="flyer-upload" type="file" accept="image/*" onChange={handleFlyerUpload} disabled={isSaving} />
                {isSaving && uploadProgress > 0 && <Progress value={uploadProgress} className="w-full mt-2" />}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>Batal</Button>
            <Button onClick={handleSaveChanges} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus lowongan pekerjaan secara permanen
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
