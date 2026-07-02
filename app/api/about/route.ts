
export async function GET() {
    const data = {
        "productName": "EzDestiny",
        "version": "1.0.0",
        "status": "Working",
        "madeby": {
            "developerName": "Yash Jangid",
            "PortfolioUrl": "https://yash-the-one.vercel.app/"
        }
    }
    return Response.json({ data }, {
        status: 200
    })
} 