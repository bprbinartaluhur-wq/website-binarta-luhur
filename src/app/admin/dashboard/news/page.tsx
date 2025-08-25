import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const newsItems = [
  {
    title: 'Binarta Luhur Meluncurkan Produk Seri-Z Terbaru',
    category: 'Teknologi',
    date: '15 Juli 2024',
    status: 'Published'
  },
  {
    title: 'Ekspansi Pasar Global: Binarta Luhur di Eropa',
    category: 'Bisnis',
    date: '28 Juni 2024',
    status: 'Published'
  },
  {
    title: 'Inisiatif Hijau Kami: Menuju Produksi Berkelanjutan',
    category: 'Lingkungan',
    date: '10 Juni 2024',
    status: 'Published'
  },
];

export default function NewsAdmin() {
  return (
    <div>
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Berita</h2>
                <p className="text-muted-foreground">Kelola artikel berita Anda di sini.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Berita
            </Button>
        </div>
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Judul</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead className="hidden md:table-cell">Tanggal Publikasi</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                            <span className="sr-only">Aksi</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {newsItems.map((item) => (
                        <TableRow key={item.title}>
                            <TableCell className="font-medium max-w-xs truncate">{item.title}</TableCell>
                            <TableCell>
                               <Badge variant="outline">{item.category}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{item.date}</TableCell>
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
