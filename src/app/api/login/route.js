import { NextResponse } from 'next/server'

export async function GET() {
	const APP_URL = "http://192.168.1.68:29500" + "/api/v1";
	const res = await fetch(`${APP_URL}/pairs?pageIndex=1&pageSize=3`)
	const data = await res.json()
	return NextResponse.json({ data })
}
