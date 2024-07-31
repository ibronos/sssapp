const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function izinDefaultSetup() {
    
  const totalIzinJenis = await prisma.izin_jenis.count();
  const totalIzinApprove = await prisma.izin_approve.count();
  const izinJenisData = [
    { name: 'Cuti', slug: 'cuti' },
    { name: 'Libur', slug: 'libur' },
    { name: 'Sakit', slug: 'sakit' },
  ];
  const izinApproveData = [
    { name: 'Menunggu Persetujuan', slug: 'menunggu' },
    { name: 'Ditolak', slug: 'ditolak' },
    { name: 'Direvisi', slug: 'direvisi' },
    { name: 'Diterima', slug: 'diterima' },
  ];

  if( totalIzinJenis === 0 ) {
    await prisma.izin_jenis.createMany({
      data: izinJenisData,
      skipDuplicates: true,
    });   
  }

  if( totalIzinApprove === 0 ) {
    await prisma.izin_approve.createMany({
      data: izinApproveData,
      skipDuplicates: true,
    });   
  }

}
  
module.exports = {
    izinDefaultSetup : izinDefaultSetup
};