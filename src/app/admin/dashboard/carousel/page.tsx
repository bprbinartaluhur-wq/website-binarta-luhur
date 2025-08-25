'use client';

import Image from "next/image";
import { useState, ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle, Upload, Loader2 } from "lucide-react"
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
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface CarouselItem {
  src: string;
  alt: string;
  status: "Published" | "Draft";
}

const initialCarouselItems: CarouselItem[] = [
  {
    src: "https://placehold.co/1600x900.png",
    alt: "Produk Inovatif 1",
    status: "Published",
  },
  {
    src: "https://placehold.co/1600x900.png",
    alt: "Produk Inovatif 2",
    status: "Published",
  },
  {
    src: "https://placehold.co/1600x900.png",
    alt: "Produk Inovatif 3",
    status: "Published",
  },
];

export default function CarouselAdmin() {
  const [carouselItems, setCarouselItems] = useState(initialCarouselItems);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);
  const [editedItem, setEditedItem] = useState<CarouselItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleEditClick = (item: CarouselItem) => {
    setSelectedItem(item);
    setEditedItem({ ...item });
    setImageFile(null);
    setIsEditDialogOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!editedItem || !selectedItem) return;

    setIsUploading(true);

    try {
      let imageUrl = editedItem.src;

      if (imageFile) {
        const imageRef = ref(storage, `carousel-images/${uuidv4()}-${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const finalItem = { ...editedItem, src: imageUrl };

      setCarouselItems(items => items.map(item => item.alt === selectedItem.alt ? finalItem : item));
      
      toast({
        title: "Sukses!",
        description: "Item carousel berhasil diperbarui.",
      });

      setIsEditDialogOpen(false);
      setSelectedItem(null);

    } catch (error) {
        console.error("Error saving changes: ", error);
        toast({
            variant: "destructive",
            title: "Gagal!",
            description: "Terjadi kesalahan saat menyimpan perubahan.",
        });
    } finally {
        setIsUploading(false);
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
        <Button>
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
            {carouselItems.map((item) => (
              <TableRow key={item.alt}>
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
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ubah Item Carousel</DialogTitle>
            <DialogDescription>
              Lakukan perubahan pada item carousel Anda di sini. Klik simpan jika sudah selesai.
            </DialogDescription>
          </DialogHeader>
          {editedItem && (
            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                <Label>Pratinjau Gambar</Label>
                <Image
                    src={editedItem.src}
                    alt={editedItem.alt}
                    width={400}
                    height={225}
                    className="rounded-md object-cover aspect-video border"
                    unoptimized
                  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-upload">Unggah Gambar Baru</Label>
                <div className="flex items-center gap-2">
                    <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" />
                    <Label htmlFor="image-upload" className="flex-grow">
                        <Button asChild variant="outline" className="w-full">
                            <span>
                                <Upload className="mr-2 h-4 w-4" />
                                Pilih File
                            </span>
                        </Button>
                    </Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input id="alt" value={editedItem.alt} onChange={(e) => handleAltTextChange(e.target.value)} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isUploading}>Batal</Button>
            <Button onClick={handleSaveChanges} disabled={isUploading}>
              {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
