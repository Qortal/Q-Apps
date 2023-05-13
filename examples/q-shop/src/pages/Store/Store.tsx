import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { useParams } from 'react-router-dom'
import { Typography, Box, Button, useTheme } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import BlogPostPreview from '../StoreList/PostPreview'
import {
  setIsLoadingGlobal,
} from '../../state/features/globalSlice'
import {
  Product,
} from '../../state/features/storeSlice'
import { useFetchProducts } from '../../hooks/useFetchProducts'
import LazyLoad from '../../components/common/LazyLoad'
import { addPrefix, removePrefix } from '../../utils/blogIdformats'
import Masonry from 'react-masonry-css'
import ContextMenuResource from '../../components/common/ContextMenu/ContextMenuResource'

const breakpointColumnsObj = {
  default: 5,
  1600: 4,
  1300: 3,
  940: 2,
  700: 1,
  500: 1
}
export const Store = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const { user } = useSelector((state: RootState) => state.auth)
  const currentStore = useSelector((state: RootState) => state.global.currentStore)


  const { store, user: username } = useParams()

  const dispatch = useDispatch()
  const [userStore, setUserStore] = React.useState<any>(null)
  const { getProduct, hashMapProducts } = useFetchProducts()

  const [products, setProducts] = React.useState<Product[]>([])

  const getUserProducts = React.useCallback(async () => {
    let name = username

    if (!name) return
    if (!store) return

    try {
      dispatch(setIsLoadingGlobal(true))
      const offset = products.length
      //TODO - NAME SHOULD BE EXACT
      const query = `q-store-product-${store}`
      const url = `/arbitrary/resources/search?service=PRODUCT&query=${query}&limit=20&exactmatchnames=true&name=${name}&includemetadata=true&offset=${offset}&reverse=true`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()

      const structureData = responseData.map((product: any): Product => {
        return {
          title: product?.metadata?.title,
          category: product?.metadata?.category,
          categoryName: product?.metadata?.categoryName,
          tags: product?.metadata?.tags || [],
          description: product?.metadata?.description,
          created: '',
          user: product.name,
          id: product.identifier
        }
      })
      setProducts(structureData)
      const copiedProducts: Product[] = [...products]
      structureData.forEach((product: Product) => {
        const index = products.findIndex((p) => p.id === product.id)
        if (index !== -1) {
          copiedProducts[index] = product
        } else {
          copiedProducts.push(product)
        }
      })
      setProducts(copiedProducts)
    } catch (error) {
    } finally {
      dispatch(setIsLoadingGlobal(false))
    }
  }, [username, store, products])
  const getStore = React.useCallback(async () => {
    let name = username

    if (!name) return
    if (!store) return
    try {
      const urlStore = `/arbitrary/STORE/${name}/${store}`
      const response = await fetch(urlStore, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setUserStore(responseData)
    } catch (error) {}
  }, [username, store])

  React.useEffect(() => {
    getStore()
  }, [username, store])
  const getProducts = React.useCallback(async () => {
    await getUserProducts()
  }, [getUserProducts])



  if (!userStore) return null
  return (
    <>
    

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        {products.map((product, index) => {
          const existingProduct = hashMapProducts[product.id]
          let storeProduct = product
          if (existingProduct) {
            storeProduct = existingProduct
          }
          const storeId = currentStore?.id || ""
          const productId = storeProduct?.id || ""
          return (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                width: 'auto',
                position: 'relative',
                ' @media (max-width: 450px)': {
                  width: '100%'
                }
              }}
            >
              <ContextMenuResource
                name={storeProduct.user}
                service="BLOG_POST"
                identifier={storeProduct.id}
                link={`qortal://APP/Q-Blog/${storeProduct.user}/${storeId}/${productId}`}
              >
                <BlogPostPreview
                  onClick={() => {
                    navigate(`/${storeProduct.user}/${storeId}/${productId}`)
                  }}
                  description={storeProduct?.description}
                  title={storeProduct?.title}
                  createdAt={storeProduct?.created}
                  author={storeProduct.user}
                  blogPost={storeProduct}
                  tags={storeProduct?.tags}
                />
              </ContextMenuResource>
            </Box>
          )
        })}
      </Masonry>
      <LazyLoad onLoadMore={getProducts}></LazyLoad>
    </>
  )
}
