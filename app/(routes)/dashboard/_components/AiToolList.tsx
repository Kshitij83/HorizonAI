import React from 'react'
import AiToolCard from './AiToolCard'

export const AiToolsList = [
  {
    name: 'AI Career Q&A Chat',
    desc: 'Ask career-related questions',
    icon: '',
    button: 'Ask Now',
    path: '/ai-tools/ai-chat'
  },
  {
    name: 'AI Resume Analyzer',
    desc: 'Improve your resume with AI',
    icon: '',
    button: 'Analyze Now',
    path: '/ai-tools/ai-resume-analyzer'
  },
  {
    name: 'Career Roadmap Generator',
    desc: 'Build your roadmap',
    icon: '',
    button: 'Generate Now',
    path: '/ai-tools/ai-roadmap-agent'
  },
  {
    name: 'Cover Letter Generator',
    desc: 'Write a cover letter',
    icon: '',
    button: 'Create Now',
    path: '/cover-letter-generator'
  }
]


function AiToolList(){
  return (
    <div className='mt-7 p-5 bg-white rounded-xl shadow-md'>
      <h2 className='font-bold text-lg'>Available AI Tools</h2>
      <p>Start Building and Shape your Career with this j</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
        {AiToolsList.map((tool:any, index) => (
          <AiToolCard tool={tool} key={index} />
        ))}
      </div>
    </div>
  )
}

export default AiToolList