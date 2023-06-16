/**
 * - styles - プロパティと値のオブジェクト
 * - breakPoint - ブレイクポイント
 * - spStyles - sp用のプロパティと値のオブジェクト
 */
export type TypeGenerateStylesProps = {
  styles?: {
    [key: string]: string
  }
  breakPoint?: number
  spStyles?: {
    [key: string]: string
  }

  hoverStyles?: {
    [key: string]: string
  }
}

/**
 * @param props スタイルを記述したオブジェクト（例）{styles: {'background-color': '#fff', 'width': '100%',}} | undefined
 * @returns 複数のスタイルを文字列でつなげたもの
 *
## styled-componentのなかで、スタイルを設定したオブジェクトから、スタイルの文字列を生成する。
***
### 使い方

1. 親コンポーネントでpropsを渡す。
```tsx
<ChildComponent
  styles={{
    'display': 'inline-block',
    'margin-left': '0.2em',
  }}
  breakPoint={750}
  spStyles={{
    'display': 'block',
    'font-size': '20px',
  }}
/>
```
2. 子コンポーネントで関数使用。
```tsx
// 関数と型をインポート
import generateStyles, { TypeGenerateStylesProps } from '@/features/bookshelf/utils/generateStyles'
// コンポーネントに渡されるpropsの型
type Props = TypeGenerateStylesProps & { // ←ここで指定
  hoge: string // ←これは例えば
}
// コンポーネント
const ChildComponent: React.FC<Props> = (props) => {
  return (
    <StyledDiv
      // styled-componentsにpropsを渡す
      styles={props.styles}
      breakPoint={props.breakPoint}
      spStyles={props.spStyles}
    >
      {'sample'}
    </StyledDiv>
  )
}
// styled-componentsに渡されるpropsの型はTypeGenerateStylesProps
const StyledDiv = styled.div<TypeGenerateStylesProps>`
  ${(props) => generateStyles(props)}// 既存スタイルを上書きできるように、下に書く。
`
```
 */
export const generateStyles = (props: TypeGenerateStylesProps) => {
  let allStyles = ''

  if (props.styles) {
    let styles = ''
    for (const key in props.styles) {
      styles += `${key}: ${props.styles[key]};`
    }
    allStyles += styles
  }

  // sp用スタイル
  if (props.breakPoint && props.spStyles) {
    let spStyles = ''
    for (const key in props.spStyles) {
      spStyles += `${key}: ${props.spStyles[key]};`
    }
    allStyles += `@media screen and (max-width:${props.breakPoint}px) {${spStyles}}`
  }

  if (props.hoverStyles) {
    let styles = ''
    for (const key in props.hoverStyles) {
      styles += `${key}: ${props.hoverStyles[key]};`
    }
    allStyles += `&:hover{${styles}}`
  }

  if (allStyles === '') return null
  return allStyles
}
