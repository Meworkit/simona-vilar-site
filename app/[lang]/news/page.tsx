import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../components";
import { copy, type Lang } from "../../content";
import { Newsletter } from "../../Newsletter";

export const dynamicParams=false;
export function generateStaticParams(){return[{lang:"uk"},{lang:"ru"}]}
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{const{lang}=await params;if(!(lang in copy))return{};const c=copy[lang as Lang],brand=lang==="uk"?"Сімона Вілар":"Симона Вилар",title=`${c.news} — ${brand}`,url=`https://simonavilar.com/${lang}/news`,ogImage={url:"https://simonavilar.com/og-image.jpg",width:1200,height:630,alt:"Симона Вилар — официальный сайт"};return{title,description:c.articleParas[0],alternates:{canonical:url,languages:{uk:"https://simonavilar.com/uk/news",ru:"https://simonavilar.com/ru/news","x-default":"https://simonavilar.com/ru/news"}},openGraph:{title,description:c.articleParas[0],siteName:brand,locale:lang==="uk"?"uk_UA":"ru_RU",type:"website",url,images:[ogImage]},twitter:{card:"summary_large_image",title,description:c.articleParas[0],images:[ogImage.url]}}}
export default async function NewsPage({params}:{params:Promise<{lang:string}>}){const{lang:raw}=await params;if(!(raw in copy))notFound();const lang=raw as Lang,c=copy[lang];return <><Header lang={lang} page="news"/><main><div className="newsPage shell"><div className="pageHeading"><h1>{c.news}</h1></div><div className="blogGrid"><a className="blogCard" href={`/${lang}/news/official-statement`}><time dateTime="2026-09-08">08.09.2026</time><h2>{c.statement}</h2><p>{c.articleParas.join(" ")}</p><span>{c.read} →</span></a></div></div><Newsletter lang={lang}/></main><Footer lang={lang} page="news"/></>}
