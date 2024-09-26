import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css'

const cn = bem('Pagination')

function Pagination({ pageCount = 1, currentPage = 1, withAction = () => { } }) {
  let page = currentPage
  let isValidPage = true
  if (pageCount < 1) {
    console.error("Ошибка пагинации: Количество страниц должно быть положительным")
    return
  }
  if (currentPage < 1) {
    console.error("Ошибка пагинации: Номер текущей страницы должен быть положительным")
    page = 1
    isValidPage = false
  }
  if (currentPage > pageCount) {
    console.error("Ошибка пагинации: Номер текущей страницы не должен превышать количества страниц")
    page = pageCount
    isValidPage = false
  }

  const dots = <span className={cn('dots')} >&nbsp;...&nbsp;</span>
  let buttons

  switch (pageCount) {
    case 1:
    case 2: buttons =
      <>
        <Button num={1} currentPage={page} />
        {dots}
        <Button num={pageCount} currentPage={page} />
      </>
      break;
    case 3:
    case 4: buttons =
      <>
        <Button num={1} currentPage={page} />
        <Button num={2} currentPage={page} />
        {pageCount > 3 && <Button num={3} currentPage={page} />}
        <Button num={pageCount} currentPage={page} />
      </>
      break;
    default:
      buttons =
        <>
          <Button num={1} currentPage={page} />
          {page > 3 && dots}

          {page === pageCount && <Button num={page - 2} />}

          {page > 2 && <Button num={page - 1} />}
          {page > 1 && page < pageCount && <Button num={page} currentPage={page} />}
          {page < pageCount - 1 && <Button num={page + 1} />}

          {page === 1 && <Button num={page + 2} />}

          {page < pageCount - 2 && dots}
          <Button num={pageCount} currentPage={page} />
        </>
  }

  return (
    <div className={cn()}>
      {buttons}
    </div>
  )

  function Button({ num, currentPage }) {
    const active = isValidPage && currentPage === num
    const children =
      <button className={cn('button', { active })}>{num || ''}</button>

    return (
      withAction({ num, children })
    )
  }
}

export default memo(Pagination)

Pagination.propTypes = {
  pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  withAction: PropTypes.func,
};