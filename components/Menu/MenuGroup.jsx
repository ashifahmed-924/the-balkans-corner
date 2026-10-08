"use client";

import { useState } from "react";
import MenuRow from "./MenuRow";

export default function MenuGroup({ items }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <ul className="relative">
      {items.map((item, i) => (
        <MenuRow
          key={item.id}
          item={item}
          index={i}
          active={activeId === item.id}
          onActivate={() => setActiveId(item.id)}
          onDeactivate={() => setActiveId((id) => (id === item.id ? null : id))}
        />
      ))}
    </ul>
  );
}
