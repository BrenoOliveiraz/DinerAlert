import React, { Children, ReactNode } from 'react'
import { ITextProps, Text } from "native-base";


interface TitleProps extends ITextProps{
    children: ReactNode
}


export default function Title({children, ...rest}:TitleProps) {
  return (
    <Text fontSize={"2xl"} fontWeight={"bold"} color={"gray.500"} textAlign="center" mt={5} {...rest} >
   {children}
  </Text>
  )
}
