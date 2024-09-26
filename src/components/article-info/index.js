import { useTranslation } from '../../store/lang/use-translation';
import './style.css';
import { cn as bem } from '@bem-react/classname';

const cn = bem('ArticleInfo');

export default function ArticleInfo({ data, actions }) {

  const { t } = useTranslation()

  return (
    <div className={cn()}>
      <div className={cn('description')}>{data.description}</div>
      <div className={cn('madeIn')}>
        {t('madeIn')}: <b>{data.madeIn.title} ({data.madeIn.code})</b>
      </div>
      <div className={cn('category')}>
        {t('category')}: <b>{data.category.title}</b>
      </div>
      <div className={cn('released')}>
        {t('releasedInYear')}: <b>{new Date(data.dateCreate).getFullYear()}</b>
      </div>
      <div className={cn('price')}>
        {t('price')}: <b>{data.price} ₽</b>
      </div>
      {actions}
    </div>
  )
}