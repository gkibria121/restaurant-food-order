<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
   public function order( $id)
   {
    $order = Order::find($id);
    return $order;
   }
   public function orders()
   {
    $orders = Order::all();
    return $orders;
   }
}
