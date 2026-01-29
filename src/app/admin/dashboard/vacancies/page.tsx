
'use client';

import { useState, useEffect } from "react";
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
import { firestore } from "@/lib/firebase";
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';

interface Vacancy {
  id: string;
  title: string;
  location: string;
  type: "Penuh Waktu" | "Paruh Waktu" | "Magang";
  description: string;
  status: "Dibuka" | "Ditutup";
  createdAt: Timestamp;
}

type EditableVacancy = Omit<Vacancy, 'id' | 'createdAt'>;

const newItemTemplate: EditableVacancy = {
    title: "",
    location: "",
    type: "Penuh Waktu",
    description: "",
    status: "Dibuka",
};

export default function VacanciesAdmin() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Vacancy | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Vacancy | null>(null);
  const [editedItem, setEditedItem] = useState<EditableVacancy | null>(null);
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
    setIsDialogOpen(true);
  };
  
  const handleAddClick = () => {
    setDialogMode('add');
    setSelectedItem(null);
    setEditedItem(newItemTemplate);
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

    setIsSaving(true);

    try {
        const dataToSave: Omit<Vacancy, 'id' | 'createdAt'> & { createdAt?: any } = { ...editedItem };

        if (dialogMode === 'edit' && selectedItem) {
            const itemDocRef = doc(firestore, "vacancies", selectedItem.id);
            await updateDoc(itemDocRef, dataToSave);
            setVacancies(items => items.map(item => item.id === selectedItem.id ? { ...item, ...dataToSave, id: selectedItem.id } : item));
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
    }
  };

  const handleFieldChange = (field: keyof EditableVacancy, value: string) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [field]: value });
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
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'edit' ? 'Ubah Lowongan' : 'Tambah Lowongan'}</DialogTitle>
            <DialogDescription>
              {dialogMode === 'edit'
                ? 'Lakukan perubahan pada detail lowongan pekerjaan.'
                : 'Masukkan detail untuk lowongan pekerjaan baru.'}
            </DialogDescription>
          </DialogHeader>
          {editedItem && (
            <div className="grid gap-4 py-4">
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
