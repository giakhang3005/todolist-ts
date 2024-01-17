import "./Components.scss"

type Props = {
    color: string;
    children: string;
}

const Tag = ({ color, children }: any) => {

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    const isNearlyWhite = (rgb: { r: number, g: number, b: number } | null) => {
        return rgb && (rgb.r > 200 && rgb.g > 200 && rgb.b > 200);
    }

    return (
        <span className="tag" style={Object.assign({ backgroundColor: color }, { color: isNearlyWhite(hexToRgb(color)) ? "black" : "white" })}>
            {children}
        </span>
    )
}

export default Tag