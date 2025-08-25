import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const awards = [
  {
    title: 'Inovasi Terbaik 2023',
    description: 'Diakui untuk solusi terobosan di bidang teknologi industri.',
  },
  {
    title: 'Efisiensi Energi No. 1',
    description: 'Peringkat tertinggi untuk produk dengan konsumsi daya paling efisien.',
  },
  {
    title: 'Kualitas Terjamin',
    description: 'Sertifikasi standar internasional untuk kualitas dan keandalan produk.',
  },
  {
    title: 'Pertumbuhan Tercepat',
    description: 'Penghargaan sebagai perusahaan dengan pertumbuhan tercepat di sektornya.',
  },
];

export default function AwardsAdmin() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Penghargaan</h2>
          <p className="text-muted-foreground">Kelola penghargaan dan pengakuan di sini.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Tambah Penghargaan
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul Penghargaan</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>
                <span className="sr-only">Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {awards.map((award) => (
              <TableRow key={award.title}>
                <TableCell className="font-medium">{award.title}</TableCell>
                <TableCell className="max-w-md truncate">{award.description}</TableCell>
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
