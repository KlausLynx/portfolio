import HeroAvif from '../assets/heroAvif.avif'
import HeroJpg from '../assets/heroJpg.jpg'
import HeroWebp from '../assets/herowebp.webp'

export const MyFigure = () => {
    return (
        <picture className="block w-full h-full">
        <source srcSet={HeroAvif} type="image/avif" />
        <source srcSet={HeroWebp} type="image/webp" />
        <img
            className="rounded-2xl w-full h-full object-cover"
            src={HeroJpg}
            alt="Hero description"
        />
        </picture>
    );
};