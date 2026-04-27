import Foundation
import ImageIO
import UniformTypeIdentifiers

let src = URL(fileURLWithPath: "tmp-symbol-test/mic.png")
let dst = URL(fileURLWithPath: "tmp-symbol-test/mic-swift.webp")
guard let source = CGImageSourceCreateWithURL(src as CFURL, nil),
      let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
  fatalError("read failed")
}
let type = UTType.webP.identifier as CFString
guard let dest = CGImageDestinationCreateWithURL(dst as CFURL, type, 1, nil) else {
  fatalError("dest failed")
}
CGImageDestinationAddImage(dest, image, nil)
print(CGImageDestinationFinalize(dest))
