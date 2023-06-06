import { FC } from 'react';
import classNames from 'classnames';

type Columns = '3' | '4' | '5' | '6' | '7' | '8' | '9';

type GridOrder = 'order-first' | 'order-last';

type VerticalAlignment = 'items-start' | 'items-center' | 'items-end';

export interface Props {
  columnWidths: string;
  verticalAlignment: VerticalAlignment;
  mobileItemsOrder?: GridOrder;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const convertColumnWidthsToTailwindColumns = (columnWidths: string): Columns => {
  // Converting to taiwind grid columns https://tailwindcss.com/docs/grid-column
  switch (columnWidths) {
    case '1/2':
      return '6'; // 50% of 12
    case '1/3':
      return '4'; // 33% of 12
    case '2/3':
      return '8'; // 66% of 12
    case '1/4':
      return '3'; // 25% of 12
    case '3/4':
      return '9'; // 75% of 12
    default:
      return '6';
  }
};

const SectionTwoColumns: FC<Props> = ({
  columnWidths,
  verticalAlignment,
  mobileItemsOrder,
  leftContent,
  rightContent,
}) => {
  const [leftColumnWidth = '1/2', rightColumnWidth = '1/2'] = columnWidths?.split('-');
  const leftContentColumns = convertColumnWidthsToTailwindColumns(leftColumnWidth.trim());
  const rightContentColumns = convertColumnWidthsToTailwindColumns(rightColumnWidth.trim());
  return (
    <>
      <div className={classNames(`grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-0 pb-12`, verticalAlignment)}>
        <div className={classNames('lg:order-none', [`lg:col-span-${leftContentColumns}`], mobileItemsOrder)}>
          {leftContent}
        </div>
        <div className={classNames('lg:col-end-13', [`lg:col-span-${rightContentColumns}`])}>{rightContent}</div>
      </div>
      <div className="lg:col-span-3 lg:col-span-4 lg:col-span-5 lg:col-span-6 lg:col-span-7 lg:col-span-8 lg:col-span-9 hidden" />
    </>
  );
};

export default SectionTwoColumns;
