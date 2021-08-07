using MapApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MapUI.Controllers
{
    
    public class HomeController : Controller
    {
        [BindProperty]
        public ClickInfo ClickInfo { get; set; }

        AppDbContext db = new();

        public IActionResult Index()
        {
            return View();
        }


        [HttpPost("Save")]
        public IActionResult Save()
        {
            ClickInfo.CoordinateX = HttpContext.Request.Form["CoordinateX"];
            ClickInfo.CoordinateY = HttpContext.Request.Form["CoordinateY"];

            db.ClickInfos.Add(ClickInfo);
            db.SaveChanges();

            using (StreamWriter writer = new StreamWriter("map.txt", true)) //// true to append data to the file
            {
                writer.WriteLine(ClickInfo.Name + " - " + ClickInfo.Number + " - " + ClickInfo.CoordinateX + " - " + ClickInfo.CoordinateY);
            }
            return RedirectToAction("Index");
        }
    }
}
