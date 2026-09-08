import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../components";
import { copy, type Lang } from "../../content";
import { Newsletter } from "../../Newsletter";

export const dynamicParams=false;
export function generateStaticParams(){return[{lang:"uk"},{lang:"ru"}]}
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{const{lang}=await params;if(!(lang in copy))return{};const c=copy[lang as Lang];return{title:`${c.news} — Симона Вилар`,description:c.paras[1],alternates:{canonical:`https://simonavilar.com/${lang}/news`,languages:{uk:"/uk/news",ru:"/ru/news"}}}}
export default async function NewsPage({params}:{params:Promise<{lang:string}>}){const{lang:raw}=await params;if(!(raw in copy))notFound();const lang=raw as Lang,c=copy[lang];return <><Header lang={lang} page="news"/><main><div className="newsPage shell"><div className="pageHeading"><h1>{c.news}</h1></div><div className="blogGrid"><a className="blogCard" href={`/${lang}/news/official-statement`}><time dateTime="2026-09-07">07.09.2026</time><h2>{c.statement}</h2><p>{c.paras.slice(1,3).join(" ")}</p><span>{c.read} →</span></a></div></div><Newsletter lang={lang}/></main><Footer lang={lang} page="news"/></>}
