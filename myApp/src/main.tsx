import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './redux/store.ts'
import NotFound from '../NotFound.tsx'
import './index.css'
import AdminRoutes from './routes/admin.routes.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import theme from "./theme";
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import UserRoutes from './routes/user.routes.tsx'
import SignUpPage from './features/auth/pages/SignUpPage.tsx'
import { Provider } from 'react-redux'
import SignInPage from './features/auth/pages/SignInPage.tsx'
import Toast from './features/auth/components/Toast.tsx'
import AdminProductPage from './features/products/pages/AdminProductPage.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Dashboard from './Components/Dashboard.tsx'
import CategoryAdminPage from './features/category/page/CategoryAdminPage.tsx'
import { ThemeProvider } from "@mui/material/styles";
import ProductListUserPage from './features/products/pages/ProductListUserPage.tsx'
import ProductDetailsPage from './features/products/pages/ProductDetailsPage.tsx'
import BannerPageAdmin from './features/banner/page/BannerPageAdmin.tsx'
import CatalogPageUser from './features/products/pages/CatalogPageUser.tsx'
import FilterUserPage from './features/products/pages/FilterUserPage.tsx'

import AdminBrandPage from './features/products/pages/AdminBrandPage.tsx'
import AdminCategoryAttributesPage from './features/products/pages/َAdminCategoryAttributesPage.tsx'

import CatalogFilterLayout from './features/products/pages/CatalogFilterLayout.tsx'
import AdminUserPage from './features/products/pages/AdminUserPage.tsx'
import AdminReviewPage from './features/products/pages/AdminReviewPage.tsx'
import ShoppingCartPage from './features/cart/page/ShoppingCartPage.tsx'
import BonusProgram from './features/footer/BonusProgram.tsx'
import GiftCards from './features/footer/GiftCards.tsx'
import CreditPayment from './features/footer/CreditPayment.tsx'
import ServiceContracts from './features/footer/ServiceContacts.tsx'
import NonCashAccount from './features/footer/NoCashAccount.tsx'
import Payment from './features/footer/Payment.tsx'
import FindOrder from './features/footer/FindOrder.tsx'
import TermsOfDelivery from './features/footer/TermsOfDelivery.tsx'
import ExchangeReturns from './features/footer/ExchangeReturns.tsx'
import Guarantee from './features/footer/Guarantee.tsx'
import FAQ from './features/footer/FAQ.tsx'
import TermsOfUse from './features/footer/TermsOfUse.tsx'
import Blog from './features/header/components/Blog.tsx'
import Contact from './features/header/components/Blog.tsx'
import { About } from './features/header/components/About.tsx'
import Profile from './features/header/components/Profile.tsx'
import WhishlistPage from './features/whisllist/page/WhishlistPage.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserRoutes />,
    children: [
      {
        index: true,
        element: <ProductListUserPage />
      },

      {
        element: <CatalogFilterLayout />,
        children: [
          {
            path: 'catalog',
            element: <CatalogPageUser />,
           
          },
          {
              path:'catalog/product/:id',
              element:<ProductDetailsPage />
            },
             {
              path:'/cart',
              element:<ShoppingCartPage />
            },
             {
              path:'/whishlist',
              element:<WhishlistPage/>
            },
          {
            path: 'catalog/filter',
            element: <FilterUserPage />
          },
        ],
      },

   

      {
        path: 'profile',
        element: <Profile/>
      }, { path: "/bonus-program", element: <BonusProgram /> },
  { path: "/gift-cards", element: <GiftCards /> },
  { path: "/credit-and-payment", element: <CreditPayment /> },
  { path: "/service-contracts", element: <ServiceContracts /> },
  { path: "/non-cash-account", element: <NonCashAccount /> },
  { path: "/payment", element: <Payment /> },
  { path: "/find-an-order", element: <FindOrder /> },
  { path: "/terms-of-delivery", element: <TermsOfDelivery /> },
  { path: "/exchange-and-returns", element: <ExchangeReturns /> },
  { path: "/guarantee", element: <Guarantee /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/terms-of-use", element: <TermsOfUse /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact", element: <Contact /> },
   { path: "/about", element: <About /> },
    ]
  },

  {
    path: '/admin',
    element: <AdminRoutes />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },

      {
        path: 'category',
        element: <CategoryAdminPage />
      },

      {
        path: 'products',
        element: <AdminProductPage />
      },

      {
        path: 'banner',
        element: <BannerPageAdmin />
      },

      {
        path: 'brand',
        element: <AdminBrandPage />
      },
      

      {
        path: 'attributes',
        element: <AdminCategoryAttributesPage />
      },
      {path:'user',
        element:<AdminUserPage/>
      },
        {path:'review',
        element:<AdminReviewPage/>
      }

      // {
      //   path:'products/:productId/images',
      //   element:<AdminGalleryPage/>
      // }
    ]
  },

  {
    path: '/sign-up',
    element: <SignUpPage />
  },

  {
    path: '/sign-in',
    element: <SignInPage />
  },
  {
    path:'*',
    element:<NotFound/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />

        <Toast />

          <ReactQueryDevtools
            initialIsOpen={false}
          />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)