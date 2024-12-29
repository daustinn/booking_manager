import React from 'react'

export default function RoomsTypeGrid() {
  return (
    <div className="py-4">
      <table className="w-full">
        <thead>
          <tr className="[&>th]:font-normal border-b [&>th]:p-2 text-left">
            <th>Id</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Creado por</th>
            <th>Creado el</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
