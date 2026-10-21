import BannerAdmin from '@/features/banner/components/BannerAdmin'
import BannerModal from '@/features/banner/components/BannerModal'
import { useState } from 'react'
import type { IBanner } from '@/apis/bannerApi'

export default function BannerPageAdmin() {
  const [open, setOpen] = useState(false)
 const [selectedBanner, setSelectedBanner] =
  useState<IBanner | null>(null);
  const [signEditOrAdd, setSignEditOrAdd] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>('')

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
 console.log("🔥 BannerPageAdmin rendered");
  return (
   
    <div style={{marginLeft:'250px'}} >
      <BannerModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        handleClose={handleClose}
        signEditOrAdd={signEditOrAdd}
        setSignEditOrAdd={setSignEditOrAdd}
        selectedBanner={selectedBanner}
        open={open}
        handleOpen={handleOpen}
      />
     <BannerAdmin
  setSignEditOrAdd={setSignEditOrAdd}
  signEditOrAdd={signEditOrAdd}
  handleOpen={handleOpen}
  handleClose={handleClose}
  setSelectedBanner={setSelectedBanner}
/>
    </div>
  )
}