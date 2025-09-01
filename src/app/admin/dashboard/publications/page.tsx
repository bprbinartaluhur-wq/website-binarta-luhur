
'use client';

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
import { MoreHorizontal, PlusCircle, Loader2, FileText, Trash2, Download } from "lucide-react"
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
import Link from "next/link";
import { format } from 'date-fns';

interface Publication {
  id: string;
  url: string;
  title: string;
  category: "Laporan Triwulanan" | "Laporan Tahunan" | "Laporan Tata Kelola";
  createdAt: Timestamp;
}

type EditablePublication = Omit<Publication, 'id' | 'createdAt'>;

const newItemTemplate: EditablePublication = {
    url: "",
    title: "",
    category: "Laporan Triwulanan",
};

export default function PublicationsAdmin() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('edit');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Publication | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Publication | null>(null);
  const [editedItem, setEditedItem] = useState<EditablePublication | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const q = query(collection(firestore, "publications"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Publication));
        setPublications(items);
      } catch (error) {
        console.error("Error fetching publications: ", error);
        toast({
          variant: "destructive",
          title: "Gagal Mengambil Data!",
          description: "Terjadi kesalahan saat mengambil data publikasi dari database.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPublications();
  }, [toast]);

  const handleEditClick = (item: Publication) => {
    setDialogMode('edit');
    setSelectedItem(item);
    setEditedItem({ title: item.title, category: item.category, url: item.url });
    setPdfFile(null);
    setUploadProgress(0);
    setIsDialogOpen(true);
  };
  
  const handleAddClick = () => {
    setDialogMode('add');
    setSelectedItem(null);
    setEditedItem(newItemTemplate);
    setPdfFile(null);
    setUploadProgress(0);
    setIsDialogOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!editedItem) return;

    if (dialogMode === 'add' && !pdfFile) {
        toast({
            variant: "destructive",
            title: "File PDF Diperlukan!",
            description: "Silakan pilih file PDF untuk diunggah.",
        });
        return;
    }
     if (!editedItem.title) {
        toast({
            variant: "destructive",
            title: "Judul Diperlukan!",
            description: "Silakan masukkan judul untuk publikasi ini.",
        });
        return;
    }


    setIsUploading(true);
    setUploadProgress(0);
    let fileUrl = editedItem.url;

    try {
        if (pdfFile) {
            if (dialogMode === 'edit' && selectedItem) {
                const oldFileRef = ref(storage, selectedItem.url);
                try {
                    await deleteObject(oldFileRef);
                } catch (deleteError: any) {
                    if (deleteError.code !== 'storage/object-not-found') {
                       throw deleteError;
                    }
                    console.warn("Old file not found in Storage, skipping deletion:", selectedItem.url);
                }
            }

            const fileRef = ref(storage, `publications/${uuidv4()}-${pdfFile.name}`);
            const uploadTask = uploadBytesResumable(fileRef, pdfFile);

            fileUrl = await new Promise<string>((resolve, reject) => {
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
        
        const dataToSave: Omit<Publication, 'id' | 'createdAt'> & { createdAt?: any } = {
            title: editedItem.title,
            category: editedItem.category,
            url: fileUrl,
        };

        if (dialogMode === 'edit' && selectedItem) {
            const itemDocRef = doc(firestore, "publications", selectedItem.id);
            await updateDoc(itemDocRef, dataToSave);
            setPublications(items => items.map(item => item.id === selectedItem.id ? { ...item, ...dataToSave, id: selectedItem.id } : item));
            toast({
                title: "Sukses!",
                description: "Publikasi berhasil diperbarui.",
            });
        } else if (dialogMode === 'add') {
            dataToSave.createdAt = serverTimestamp();
            const docRef = await addDoc(collection(firestore, "publications"), dataToSave);
            const newPublication = { ...dataToSave, id: docRef.id, createdAt: Timestamp.now() } as Publication;
            setPublications(items => [newPublication, ...items]);
            toast({
                title: "Sukses!",
                description: "Publikasi baru berhasil ditambahkan.",
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
        setPdfFile(null);
        setSelectedItem(null);
        setEditedItem(null);
    }
  };

  const handleFieldChange = (field: keyof EditablePublication, value: string) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [field]: value });
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      if(editedItem) {
          setEditedItem({...editedItem, title: editedItem.title || file.name.replace('.pdf', '')});
      }
    } else {
        e.target.value = ''; // Reset the input
        toast({
            variant: 'destructive',
            title: 'File Tidak Valid',
            description: 'Harap pilih file dengan format PDF.',
        })
    }
  };

  const handleDeleteClick = (item: Publication) => {
    setItemToDelete(item);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    try {
        const itemDocRef = doc(firestore, "publications", itemToDelete.id);
        await deleteDoc(itemDocRef);

        const fileRef = ref(storage, itemToDelete.url);
         try {
            await deleteObject(fileRef);
        } catch (deleteError: any) {
            if (deleteError.code !== 'storage/object-not-found') {
                throw deleteError;
            }
            console.warn("File to delete not found in Storage:", itemToDelete.url);
        }

        setPublications(items => items.filter(item => item.id !== itemToDelete.id));
        toast({
            title: "Berhasil Dihapus!",
            description: `Publikasi "${itemToDelete.title}" telah dihapus.`,
        });
    } catch (error) {
        console.error("Error deleting item: ", error);
        toast({
            variant: "destructive",
            title: "Gagal Menghapus!",
            description: "Terjadi kesalahan saat menghapus publikasi.",
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
          <h2 className="text-3xl font-bold tracking-tight">Publikasi</h2>
          <p className="text-muted-foreground">Kelola file publikasi laporan di sini.</p>
        </div>
        <Button onClick={handleAddClick}>
          <PlusCircle className="mr-2 h-4 w-4" /> Tambah Publikasi
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tanggal Publikasi</TableHead>
              <TableHead>
                <span className="sr-only">Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5 w-64" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-32 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><div className="h-8 w-8" /></TableCell>
                </TableRow>
              ))
            ) : publications.length > 0 ? (
              publications.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-sm truncate">{item.title}</TableCell>
                  <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
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
                        <DropdownMenuItem asChild>
                            <Link href={item.url} target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-4 w-4" /> Unduh
                            </Link>
                        </DropdownMenuItem>
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
                    <TableCell colSpan={4} className="h-24 text-center">
                       <FileText className="mx-auto text-muted-foreground h-12 w-12 mb-2" />
                       <h3 className="font-semibold">Data Publikasi Kosong</h3>
                       <p className="text-muted-foreground text-sm">Anda belum memiliki file publikasi. Silakan tambahkan.</p>
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'edit' ? 'Ubah Publikasi' : 'Tambah Publikasi'}</DialogTitle>
            <DialogDescription>
              {dialogMode === 'edit'
                ? 'Lakukan perubahan pada detail publikasi Anda.'
                : 'Unggah file PDF baru dan masukkan detailnya.'}
            </DialogDescription>
          </DialogHeader>
          {editedItem && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input id="title" value={editedItem.title} onChange={(e) => handleFieldChange('title', e.target.value)} disabled={isUploading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select onValueChange={(value: any) => handleFieldChange('category', value)} defaultValue={editedItem.category} disabled={isUploading}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laporan Triwulanan">Laporan Triwulanan</SelectItem>
                    <SelectItem value="Laporan Tahunan">Laporan Tahunan</SelectItem>
                    <SelectItem value="Laporan Tata Kelola">Laporan Tata Kelola</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pdf-upload">Unggah File PDF</Label>
                <Input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileUpload} disabled={isUploading} />
                {isUploading && <Progress value={uploadProgress} className="w-full mt-2" />}
                {pdfFile && <p className="text-sm text-muted-foreground mt-2">File dipilih: {pdfFile.name}</p>}
                {dialogMode === 'edit' && !pdfFile && <p className="text-sm text-muted-foreground mt-2">Biarkan kosong jika tidak ingin mengubah file.</p>}
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
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus file publikasi secara permanen
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
