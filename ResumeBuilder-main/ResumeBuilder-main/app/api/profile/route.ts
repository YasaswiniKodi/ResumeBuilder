import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data.json')

// Helper to read data
function readData() {
  if (!fs.existsSync(dataFilePath)) {
    return { profile: {}, jobDescription: '', resume: '' }
  }
  const data = fs.readFileSync(dataFilePath, 'utf8')
  return JSON.parse(data)
}

// Helper to write data
function writeData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
}

export async function GET() {
  const data = readData()
  return NextResponse.json(data.profile)
}

export async function POST(request: NextRequest) {
  const profile = await request.json()
  const data = readData()
  data.profile = profile
  writeData(data)
  return NextResponse.json({ message: 'Profile saved' })
}