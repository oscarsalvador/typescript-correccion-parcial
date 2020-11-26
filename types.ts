import {Context} from "https://deno.land/x/oak@v6.3.2/mod.ts" //para IContext

export interface IClientSchema{
    _id: {$oid: string}
    cif: string,
    name: string,
    adress: string,
    mail: string | undefined,
    phone: string |undefined
}

export interface IClient{
    cif: string,
    name: string,
    adress: string,
    mail?: string,
    phone?: string,
}

export interface IProductSchema{
    _id: {$oid: string},
    sku: string,
    name: string,
    price: number,
}

export interface Iproduct{
    sku: string,
    name: string,
    price: number
}

export interface IBillSchema {
    _id: { $oid: string },
    client: string
    productos: {product: string, amount: number}[]
}

export interface IBill {
  id: string;
  client: IClient;
  products: {products: Iproduct; amount: number; price: number }[];
  totalPrice: number;
}

//para poder usar el contexto sin que el programa se queje en otros sitios
//y para que no se queje del any aqui, la siguiente linea
//deno-lint-ignore no-explicit-any
export type IContext = Context<Record<string, any>>