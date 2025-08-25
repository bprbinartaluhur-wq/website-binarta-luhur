import Image from "next/image";
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

const carouselItems = [
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
                      <DropdownMenuItem>Ubah</DropdownMenuItem>
                      <DropdownMenuItem>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
