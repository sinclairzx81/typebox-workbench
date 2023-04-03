/*--------------------------------------------------------------------------

@sinclair/typebox/workbench

The MIT License (MIT)

Copyright (c) 2023 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

import * as React from 'react'

interface SplitterProps {
  id?: string
  children: [React.ReactNode, React.ReactNode]
  minPaneWidth?: number
}

const SPLITTER_KEY = 'typebox-workbench'

export const Splitter: React.FC<SplitterProps> = ({ id, children, minPaneWidth = 10 }) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const [position, setPosition] = React.useState(() => {
    const storedPosition = id ? localStorage.getItem(`${SPLITTER_KEY}:${id}`) : null
    return storedPosition ? parseFloat(storedPosition) : 40
  })
  React.useEffect(() => {
    if (id) {
      localStorage.setItem(`${SPLITTER_KEY}:${id}`, position.toString())
    }
  }, [id, position])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
  }
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false)
  }
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newPosition = (e.clientX / window.innerWidth) * 100
      const minPosition = minPaneWidth
      const maxPosition = 100 - minPaneWidth
      if (newPosition < minPosition) {
        setPosition(minPosition)
      } else if (newPosition > maxPosition) {
        setPosition(maxPosition)
      } else {
        setPosition(newPosition)
      }
    }
  }
  const styles = {
    container: {
      display: 'flex',
      height: '100%',
      width: '100%',
      position: 'relative',
      flexDirection: 'row',
    } as React.HTMLAttributes<HTMLDivElement>,
    left: {
      height: '100%',
      width: `${position}%`,
      position: 'relative',
      zIndex: 1,
    } as React.HTMLAttributes<HTMLDivElement>,
    right: {
      height: '100%',
      width: `${100 - position}%`,
      position: 'relative',
      zIndex: 1,
    } as React.HTMLAttributes<HTMLDivElement>,
    splitter: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: `${position}%`,
      width: '12px',
      cursor: 'col-resize',
      zIndex: 2,
    } as React.HTMLAttributes<HTMLDivElement>,
  }
  return (
    <div className="splitter" style={styles.container} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div style={styles.left}>{children[0]}</div>
      <div className="gutter" style={styles.splitter} onMouseDown={handleMouseDown} />
      <div style={styles.right}>{children[1]}</div>
    </div>
  )
}
