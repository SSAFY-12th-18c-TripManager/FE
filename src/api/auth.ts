import { naverAxios } from '@/util/http-commons'
const naver = naverAxios()

function getNaverEmail(
  accessToken: string,
  success: (data: any) => void,
  fail: (error: any) => void,
) {
  naver
    .get('/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => success(response.data))
    .catch((error) => fail(error))
}
export { getNaverEmail }
