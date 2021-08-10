using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapApi.Model
{
    public class ClickInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Number { get; set; }
        public string CoordinateX { get; set; }
        public string CoordinateY { get; set; }
    }
}
