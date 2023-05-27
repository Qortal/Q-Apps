import { checkStructure } from './checkStructure'
import { extractTextFromSlate } from './extractTextFromSlate'

export const fetchAndEvaluateProducts = async (data: any) => {
  const getStoreProducts = async () => {
    const { user, productId, content } = data
    let obj: any = {
      ...content,
      isValid: false
    }

    if (!user || !productId) return obj

    try {
      const url = `http://62.141.38.192:62391/arbitrary/PRODUCT/${user}/${productId}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const responseData = await response.json()
      console.log({ responseData })
      if (checkStructure(responseData)) {
        obj = {
          ...responseData,
          ...content,
          user,
          title: responseData.title,
          created: responseData.created,
          id: productId,
          isValid: true
        }
      }
      console.log({ obj })
      return obj
    } catch (error) {}
  }

  const res = await getStoreProducts()
  return res
}