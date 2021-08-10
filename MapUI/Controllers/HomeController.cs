using MapApi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MapUI.Controllers
{

    public class HomeController : Controller
    {
        [BindProperty]
        public ClickInfo ClickInfo { get; set; }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("Save")]
        public IActionResult Save()
        {
            
            if (System.IO.File.Exists(@"wwwroot\map.json"))
            {
                var initialJson = System.IO.File.ReadAllText(@"wwwroot\map.json");
                var array = JArray.Parse(initialJson);
                var itemToAdd = new JObject();
                itemToAdd["Name"] = ClickInfo.Name;
                itemToAdd["Number"] = ClickInfo.Number;
                itemToAdd["CoordinateX"] = (string)HttpContext.Request.Form["CoordinateX"];
                itemToAdd["CoordinateY"] = (string)HttpContext.Request.Form["CoordinateY"];
                array.Add(itemToAdd);

                var jsonToOutput = JsonConvert.SerializeObject(array, Formatting.Indented);
                System.IO.File.Delete(@"wwwroot\map.json");

                using (StreamWriter writer = new StreamWriter(@"wwwroot\map.json", true))
                {
                    writer.WriteLine(jsonToOutput);
                }
            }
            else
            {
                var array = new JArray();
                var itemToAdd = new JObject();
                itemToAdd["Name"] = ClickInfo.Name;
                itemToAdd["Number"] = ClickInfo.Number;
                itemToAdd["CoordinateX"] = (string)HttpContext.Request.Form["CoordinateX"];
                itemToAdd["CoordinateY"] = (string)HttpContext.Request.Form["CoordinateY"];
                array.Add(itemToAdd);
                var jsonToOutput = JsonConvert.SerializeObject(array, Formatting.Indented);
                using (StreamWriter writer = new StreamWriter(@"wwwroot\map.json", true))
                {
                    writer.WriteLine(jsonToOutput);
                }
            }
            return RedirectToAction("Index");
        }

        [HttpGet("ShowRecords")]
        public IActionResult ShowRecords()
        {
            string path = @"wwwroot\map.json";
            var text = System.IO.File.ReadAllText(path);
            return Json(text);
        }
    }
}
