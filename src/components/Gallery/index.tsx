import { useState } from 'react'

import Section from '../Section'
import { GalleryItem } from '../../pages/home'

import { Item, Items, Action, Modal, ModalContent } from './styles'

import spiderman from '../../assets/images/banner-homem-aranha.png'
import hogwarts from '../../assets/images/fundo_hogwarts.png'

import play from '../../assets/images/play.png'
import zoom from '../../assets/images/zoom.png'
import fechar from '../../assets/images/fechar.png'

const mock: GalleryItem[] = [
  {
    type: 'image',
    url: spiderman
  },
  {
    type: 'image',
    url: hogwarts
  },
  {
    type: 'video',
    url: 'https://www.youtube.com/embed/kTbXqSKj_MU?si=qJwU8fUVxxP2EkZA'
  }
]

type Props = {
  defaultCover: string
  name: string
  items: GalleryItem[]
}

interface ModalState extends GalleryItem {
  isVisible: boolean
}

const Gallery = ({ defaultCover, name, items }: Props) => {
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
    type: 'image',
    url: ''
  })
  const [ModalEstaAberto, setModalEstaAberto] = useState(false)
  const [modalUrl, setModalUrl] = useState('')

  const getMediaCover = (item: GalleryItem) => {
    if (item.type === 'image') return item.url
    return defaultCover
  }

  const getMediaIcon = (item: GalleryItem) => {
    if (item.type === 'image') return zoom
    return play
  }

  const closeModal = () => {
    setModal({ isVisible: false, type: 'image', url: '' })
  }

  return (
    <>
      <Section title="Galeria" background="black">
        <Items>
          {items.map((media, index) => (
            <Item
              key={media.url}
              onClick={() => {
                setModal({ isVisible: true, type: media.type, url: media.url })
              }}
            >
              <img
                src={getMediaCover(media)}
                alt={`Media ${index + 1} de ${name}`}
              />
              <Action>
                <img
                  src={getMediaIcon(media)}
                  alt="Clique para maximizar a mídia"
                />
              </Action>
            </Item>
          ))}
        </Items>
      </Section>
      <Modal className={modal.isVisible ? 'visible' : ''}>
        <ModalContent className="container">
          <header>
            <h4>{name}</h4>
            <img
              src={fechar}
              alt="Ícone de fechar"
              onClick={() => {
                closeModal()
              }}
            />
          </header>
          {modal.type === 'image' ? (
            <img src={modal.url} />
          ) : (
            <iframe frameBorder={0} src={modal.url} />
          )}
        </ModalContent>
        <div
          onClick={() => {
            closeModal()
          }}
          className="overlay"
        ></div>
      </Modal>
    </>
  )
}

export default Gallery

// {{setModalEstaAberto(true); setModalUrl(media.url)}} //duas funcoes numa action entre {} e separadas por ;

//Poderia só colar o onclick de fechar no overlay, mas o prof prefere fazer uma function:
// <Modal className={modal.isVisible ? 'visible' : ''}>
// <ModalContent className="container">
//   <header>
//     <h4>{name}</h4>
//     <img
//       src={fechar}
//       alt="Ícone de fechar"
//       onClick={() => {
//         setModal({ isVisible: false, type: 'image', url: '' })
//       }}
//     />
//   </header>
//   {modal.type === 'image' ? (
//     <img src={modal.url} />
//   ) : (
//     <iframe frameBorder={0} src={modal.url} />
//   )}
// </ModalContent>
// <div
//   className="overlay"
//   onClick={() => {
//     setModal({ isVisible: false, type: 'image', url: '' })
//   }}
// ></div>
// </Modal>
