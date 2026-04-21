import { NextResponse } from 'next/server'
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

export async function GET() {
  const data = readData()
  return NextResponse.json({ resume: data.resume })
}