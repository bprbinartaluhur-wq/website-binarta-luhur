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

const products = [
  {
    name: 'Mesin Cerdas X-100',
    status: 'Published',
    description: 'Optimalisasi proses industri Anda dengan mesin cerdas yang efisien dan andal.',
  },
  {
    name: 'Platform Analitik Data',
    status: 'Published',
    description: 'Ubah data menjadi wawasan berharga dengan platform analitik kami yang canggih.',
  },
  {
    name: 'Solusi Energi Terbarukan',
    status: 'Draft',
    description: 'Kontribusi pada lingkungan dengan solusi energi bersih dan berkelanjutan.',
  },
];

export default function ProductsAdmin() {
  return (
    <div>
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Produk</h2>
                <p className="text-muted-foreground">Kelola produk unggulan Anda di sini.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Produk
            </Button>
        </div>
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama Produk</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Deskripsi Singkat</TableHead>
                        <TableHead>
                            <span className="sr-only">Aksi</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.name}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>
                                <Badge variant={product.status === 'Published' ? 'default' : 'secondary'}>
                                    {product.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell max-w-sm truncate">
                                {product.description}
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
