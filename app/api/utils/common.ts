import { type NextRequest } from 'next/server'
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, API_URL, APP_ID } from '@/config'
import Cookies from 'js-cookie'

const userPrefix = `user_${APP_ID}:`

export const getInfo = (request: NextRequest) => {
  // let userId = Cookies.get('session_id')
  let userId = Cookies.get('session_id')

  if (userId == undefined || userId == null || userId == '') {
    userId = new Date().getTime() + v4()
    // Cookies.set('session_id', userId!, { expires: 365 })
    Cookies.set('session_id', userId!, { expires: 365 })
  }
  const sessionId = request.cookies.get('session_id')?.value || userId!
  const user = userPrefix + sessionId
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  return { 'Set-Cookie': `session_id=${sessionId}` }
  // return {  }
}

export const client = new ChatClient(API_KEY, API_URL || undefined)
