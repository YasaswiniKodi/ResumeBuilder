import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
})

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

export async function POST(request: NextRequest) {
  const data = readData()
  const { profile, jobDescription } = data

  if (!profile || !jobDescription) {
    return NextResponse.json({ error: 'Profile and job description required' }, { status: 400 })
  }

  const prompt = `Create a professional resume for: ${profile.name || 'Candidate'}

Profile: ${profile.skills || 'Skills not provided'}, ${profile.projects || 'Projects not provided'}

Job: ${jobDescription}

Format as:
# NAME
**Role**
Email | Location

## Professional Summary
[2-3 sentences about experience]

## Skills
- **Languages:** Java, Python, etc.
- **Web:** HTML, CSS, React
- **Tools:** Git, VS Code

## Projects
### Project Name
- Description bullet
- Technologies used
- Impact

## Education
Degree details

Keep it concise, professional, and well-formatted.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    })

    const resume = completion.choices[0].message.content
    data.resume = resume
    writeData(data)

    return NextResponse.json({ resume })
  } catch (error) {
    console.error('OpenAI API Error:', error)
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 })
  }
}