// "dot" is just another word in the mark: same face, same size, only recessed in
// colour. Nothing here is sized or shifted relative to the surrounding text, so
// the mark renders identically at any scale.
export default function Wordmark() {
  return (
    <>
      cwru.<span className="text-muted-foreground">wtf</span>
    </>
  )
}
