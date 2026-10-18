"use client";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
export default function ClearCart() { const { dispatch } = useCart(); useEffect(() => dispatch({ t: "clear" }), [dispatch]); return null; }
