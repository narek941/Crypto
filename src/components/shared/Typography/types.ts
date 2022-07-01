type TypoType =
  | 'Tiny'
  | 'Semi'
  | 'Bold'
  | 'Semibold'
  | 'Small'
  | 'Large'
  | 'Extra'
  | 'Medium'
  | 'Regular';

type Variant = 'Text' | 'Heading' | 'Button' | 'Label' | 'Link';

type Align = ['right', 'left', 'center', 'justify'];

export interface ITypographyProps {
  align?: Align;
  color?: string;
  type?: TypoType;
  variant?: Variant;
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
}
