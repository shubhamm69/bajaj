import { NextResponse } from 'next/server';

interface PostRequestBody {
  data: (string | number)[];
}

interface ResponseBody {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: (string | number)[];
  alphabets: string[];
  highest_lowercase_alphabet: string[];
}

export async function POST(req: Request) {
  try {
    const body: PostRequestBody = await req.json();
    const { data } = body;

    if (!Array.isArray(data)) {
      return NextResponse.json({ is_success: false, message: 'Invalid input' }, { status: 400 });
    }

    const numbers: (string | number)[] = [];
    const alphabets: string[] = [];
    let highestLowercase: string | null = null;

    data.forEach((item) => {
      if (typeof item === 'string' && /^[0-9]+$/.test(item)) {
        numbers.push(item);
      } else if (!isNaN(Number(item))) {
        numbers.push(item);
      } else if (typeof item === 'string' && item.length === 1 && /[a-zA-Z]/.test(item)) {
        alphabets.push(item);
        if (/[a-z]/.test(item) && (!highestLowercase || item > highestLowercase)) {
          highestLowercase = item;
        }
      }
    });

    const response: ResponseBody = {
      is_success: true,
      user_id: "ShubhamSingh_19102003",
      email: "shubham.singh2021@vitstudent.ac.in",        
      roll_number: "21BAI1070",       
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ is_success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    operation_code: 1,
  }, { status: 200 });
}
