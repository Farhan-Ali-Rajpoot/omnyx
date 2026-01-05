import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/db/connectDB';
import verifyRequestSource from '@/libs/middleware/verifyRequestSource';
import AdminModel from '@/models/admin.model';

export async function POST(req: any) {
  try {
    const check = await verifyRequestSource(req);
    if (check) return check;

    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          error: 'ID is required',
        },
        {
          status: 400,
        }
      );
    };

    const existedAdmin = await AdminModel.findByIdAndDelete(id);


    return NextResponse.json(
      {
        message: 'Account deleted successfully',
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error('Internal Server Error: ', err);
    return NextResponse.json(
      {
        error: 'Internal server Error',
      },
      {
        status: 501,
      }
    );
  }
}