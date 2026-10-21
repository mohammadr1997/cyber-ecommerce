import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import WatchOutlinedIcon from '@mui/icons-material/WatchOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import HeadsetOutlinedIcon from '@mui/icons-material/HeadsetOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';

import type { ReactNode } from "react";
export const categoryIcons:Record<string,ReactNode> = {
Phones:<PhoneAndroidOutlinedIcon/>,
SmartWatches:<WatchOutlinedIcon/>,
Headphones:<HeadsetOutlinedIcon/>,
Computers:<ComputerOutlinedIcon/>,
Gaming:<VideogameAssetOutlinedIcon/>,
Cameras:<CameraAltOutlinedIcon/>,
};

