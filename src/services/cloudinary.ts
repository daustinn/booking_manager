import { v2 as cloudinary } from 'cloudinary'

export type CloudinaryImageResponseApi = {
  secure_url: string
}

cloudinary.config({
  cloud_name: 'dc0t90ahb',
  api_key: '431372291279742',
  api_secret: '1f-Tk0xpl38TzWDgq_tcwd8RiUM'
})

export async function uploadImage(image: File) {
  try {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'test/profiles',
            format: 'webp'
          },
          (err, result) => {
            if (err) {
              reject(err)
            }
            resolve(result)
          }
        )
        .end(buffer)
    })

    if (response) {
      const { secure_url } = response as CloudinaryImageResponseApi
      return {
        msg: 'Image uploaded successfully',
        ok: true,
        url: secure_url
      }
    }
    return {
      msg: 'Image upload not found',
      ok: false
    }
  } catch (error) {
    return {
      msg: 'Image upload failed',
      ok: false,
      error
    }
  }
}
