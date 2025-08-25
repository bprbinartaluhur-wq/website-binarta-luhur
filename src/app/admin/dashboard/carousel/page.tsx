'use client';

import Image from "next/image";
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
import { MoreHorizontal, PlusCircle } from "lucide-react"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);
  const [editedItem, setEditedItem] = useState<CarouselItem | null>(null);

  const handleEditClick = (item: CarouselItem) => {
    setSelectedItem(item);
    setEditedItem({ ...item });
    setIsEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (editedItem && selectedItem) {
      // In a real app, you'd send this to your backend.
      // For now, we just update the local state.
      setCarouselItems(items => items.map(item => item.alt === selectedItem.alt ? editedItem : item));
    }
    setIsEditDialogOpen(false);
    setSelectedItem(null);
  };

  const handleFieldChange = (field: keyof CarouselItem, value: string) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [field]: value });
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
                  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="src">URL Gambar</Label>
                <Input id="src" value={editedItem.src} onChange={(e) => handleFieldChange('src', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input id="alt" value={editedItem.alt} onChange={(e) => handleFieldChange('alt', e.target.value)} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSaveChanges}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
