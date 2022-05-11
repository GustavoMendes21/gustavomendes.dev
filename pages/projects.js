import React from 'react'
import Head from 'next/head'
import { AnimateSharedLayout } from 'framer-motion'
import Base from '../layouts/Base'
import FeaturedProject from '../components/FeaturedProject'
import { FeaturedProjects } from '../components/FeaturedProjects'
import stripHtml from '../lib/strip-html'
import items from '../data/projects'

export async function getStaticProps() {
  const meta = {
    title: 'Projects | Gustavo Mendes',
    tagline: 'Work, hobby & open source.',
    // image: 'https://github.com/birobirobiro/birobirobiro.dev/blob/main/.github/setup.jpeg',
    primaryColor: 'darkBlue',
    secondaryColor: 'blue',
  }

  return { props: meta }
}

function Projects(props) {
  const renderFeatured = () => {
    const featured = [
      'Headset Lading Page',
      'Netflix Interface Clone',
      'Broker Premium',
      'DT Money',
      'SpaceY'
    ]

    return items
      .map(item => {
        return item.projects.filter(project => featured.includes(project.title))
      })
      .filter(item => {
        if (item.length > 0) {
          return item
        }
      })
      .flat()
      .map((item, index) => {
        return <FeaturedProject key={index} project={item} />
      })
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.year}</h3>
          <ul>
            {item.projects.map((project, pIndex) => {
              return <ProjectItem key={pIndex} project={project} />
            })}
          </ul>
        </div>
      )
    })
  }

  const getTotalProjects = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length
    }

    return total
  }

  const { title, image } = props
  const description = `This page lists the top <strong>${getTotalProjects()}</strong> projects that I developed during my journey as a developer.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        {/* <meta content="https://birobirobiro.dev/projects" property="og:url" /> */}
        {/* <meta content={`${image}`} property="og:image" /> */}
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Top Projects</h2>
        <FeaturedProjects>{renderFeatured()}</FeaturedProjects>

        <h2>All Projects</h2>
        {renderAll()}
      </AnimateSharedLayout>
    </>
  )
}

function ProjectItem(props) {
  const { project } = props

  return (
    <li>
      <a href={project.url} target="_blank">
        {project.title}
      </a>
    </li>
  )
}

Projects.Layout = Base

export default Projects
