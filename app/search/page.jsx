import React, { Suspense } from 'react'
import SearchPage from '../../PageElements/search_form'
export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage/>
    </Suspense>
  )
}
