import { AudioData } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanityImageUrl";
import AudioPlayerToggle from "@/components/Messages/AudioPlayerToggle/AudioPlayerToggle";
import YoutubePlayer from "@/components/Messages/YoutubePlayer/YoutubePlayer";
import { DownloadMessage } from "@/components/Messages/download/DownloadMessage";

async function getData(slug: string) {
    const query = `*[_type == 'audioMessage' && slug.current == '${slug}'][0]{
    title,
    description,
    'audioFile': audioFile.asset->url,
    'image': image.asset->url,
    youtubeUrl,
    slug
  }`;
    const data = await client.fetch(query);

    const formattedData = {
        file: data.audioFile,
        image: data.image,
        youtubeUrl: data.youtubeUrl,
        slug: data.slug,
        title: data.title,
        description: data.description,
    };

    return formattedData;
}
const AudioDetailsPage = async ({params}: {
   params: { slug: string  } 
}) => {
    const { slug } = params;
    const audioData = await getData(slug) as AudioData;
    return (
        <div className="bg-white pt-4 pb-10 md:pl-10 pl-1">
            <h1 className="text-2xl font-bold text-pink-500">{audioData.title}</h1>
            <div className="border-t border-gray-300 h-0 w-full mt-4 pb-2"></div>
            <div className="pt-4">
                <Image
                    src={urlFor(audioData.image).url()}
                    alt="Image"
                    className=""
                    width={750}
                    height={750}
                />
            </div>
            <div>
                <div className="flex gap-8 pt-4 items-center">
                    <div className="border border-solid border-gray-300 p-2">
                        <YoutubePlayer audio={audioData} iconSize="1.5rem" />
                    </div>
                    <div className="border border-solid border-gray-300 p-2">
                        <AudioPlayerToggle audio={audioData} iconSize="1.5rem" />
                    </div>
                    <div className="border border-solid border-gray-300 p-2">
                        <DownloadMessage audio={audioData} iconSize="1.5rem" />
                    </div>
                </div>
            </div>
            <p className="pt-4 text-gray-700 text-sm font-normal leading-6 md:w-[550px] w-[450px]">
                {audioData.description}
            </p>
        </div>
    )
}
export default AudioDetailsPage;
