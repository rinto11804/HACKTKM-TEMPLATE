"use client";

import React from 'react';
import Graphin, { Behaviors } from '@antv/graphin';
import { useViewportSize } from '@mantine/hooks';
  
const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;

export default function HomePage() {
  const { height, width } = useViewportSize()
  console.log(height, width)
  const data = {
    nodes: [
      {
        id: 'root',
        x: width / 2,
        y: height / 2,
      },
      {
        id: 'node-0-root',
        x: width / 2,
        y: height / 3,
      },
      {
        id: 'node-1-root',
        x: 200,
        y: 200,
      },
      {
        id: 'node-2-root',
        x: 100,
        y: 300,
      },
    ],
    edges: [
      {
        source: 'node-0-root',
        target: 'root',
      },
      {
        source: 'node-1-root',
        target: 'root',
      },
      {
        source: 'node-2-root',
        target: 'root',
      },
      {
        source: 'node-1-root',
        target: 'root',
      }
    ],
  };
  return (
    <></>
  );
}
